import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    ease?: string;
    splitType?: 'chars' | 'words' | 'lines';
    from?: gsap.TweenVars;
    to?: gsap.TweenVars;
    threshold?: number;
    rootMargin?: string;
    textAlign?: 'left' | 'right' | 'center' | 'justify' | 'start' | 'end';
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    triggerOnScroll?: boolean;
    onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
    text,
    className = '',
    delay = 100,
    duration = 0.6,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    tag = 'p',
    triggerOnScroll = true,
    onLetterAnimationComplete
}) => {
    const ref = useRef<HTMLDivElement>(null); // Changed to HTMLDivElement as it's the most common, but might need adjustment based on tag
    const animationCompletedRef = useRef(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        if (document.fonts.status === 'loaded') {
            requestAnimationFrame(() => {
                setFontsLoaded(true);
            });
        } else {
            document.fonts.ready.then(() => {
                requestAnimationFrame(() => {
                    setFontsLoaded(true);
                });
            });
        }
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text || !fontsLoaded) return;
            const el = ref.current as HTMLElement & { _rbsplitInstance?: GSAPSplitText | null };

            if (el._rbsplitInstance) {
                try {
                    el._rbsplitInstance.revert();
                } catch {
                    /* noop */
                }
                el._rbsplitInstance = null;
            }

            const startPct = (1 - threshold) * 100;
            const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
            const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
            const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
            const sign =
                marginValue === 0
                    ? ''
                    : marginValue < 0
                        ? `-=${Math.abs(marginValue)}${marginUnit}`
                        : `+=${marginValue}${marginUnit}`;
            const start = `top ${startPct}%${sign}`;

            let targets: Element[];
            const assignTargets = (self: GSAPSplitText) => {
                if (splitType.includes('chars') && self.chars.length) targets = self.chars;
                if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
                if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
                if (!targets) targets = self.chars || self.words || self.lines;
            };



            const splitInstance = new GSAPSplitText(el, {
                type: splitType,
                // smartWrap: true, // Type error potential
                // autoSplit: splitType === 'lines',
                linesClass: 'split-line',
                wordsClass: 'split-word',
                charsClass: 'split-char',
                reduceWhiteSpace: false,
                onSplit: (self: GSAPSplitText) => {
                    assignTargets(self);
                    const tween = gsap.fromTo(
                        targets,
                        { ...from },
                        {
                            ...to,
                            duration,
                            ease,
                            stagger: delay / 1000,
                            scrollTrigger: triggerOnScroll ? {
                                trigger: el,
                                start,
                                once: true,
                                fastScrollEnd: true,
                                anticipatePin: 0.4
                            } : undefined,
                            onComplete: () => {
                                animationCompletedRef.current = true;
                                if (onLetterAnimationComplete) onLetterAnimationComplete();
                            },
                            willChange: 'transform, opacity',
                            force3D: true
                        }
                    );
                    return tween;
                }
            } as ConstructorParameters<typeof GSAPSplitText>[1]);

            el._rbsplitInstance = splitInstance;

            return () => {
                ScrollTrigger.getAll().forEach(st => {
                    if (st.trigger === el) st.kill();
                });
                try {
                    splitInstance.revert();
                } catch {
                    /* noop */
                }
                el._rbsplitInstance = null;
            };
        },
        {
            dependencies: [
                text,
                delay,
                duration,
                ease,
                splitType,
                JSON.stringify(from),
                JSON.stringify(to),
                threshold,
                rootMargin,
                triggerOnScroll,
                fontsLoaded,
                onLetterAnimationComplete
            ],
            scope: ref
        }
    );

    const renderTag = () => {
        const style: React.CSSProperties = {
            textAlign,
            overflow: 'hidden',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            wordWrap: 'break-word',
            willChange: 'transform, opacity'
        };
        const classes = `split-parent ${className}`;

        // Helper to render with ref
        const props = { ref: ref as React.RefObject<HTMLHeadingElement | HTMLParagraphElement>, style, className: classes };

        switch (tag) {
            case 'h1': return <h1 {...props}>{text}</h1>;
            case 'h2': return <h2 {...props}>{text}</h2>;
            case 'h3': return <h3 {...props}>{text}</h3>;
            case 'h4': return <h4 {...props}>{text}</h4>;
            case 'h5': return <h5 {...props}>{text}</h5>;
            case 'h6': return <h6 {...props}>{text}</h6>;
            default: return <p {...props}>{text}</p>;
        }
    };
    return renderTag();
};

export default SplitText;
