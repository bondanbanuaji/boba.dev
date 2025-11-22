export default function Work() {
    return (
        <div className='min-h-screen pt-32 px-6'>
            <h1 className='text-6xl font-bold mb-8'>Selected Work</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className='aspect-video bg-white/5 rounded-lg p-8 hover:bg-white/10 transition-colors cursor-pointer'>
                        <h3 className='text-2xl font-bold'>Project {item}</h3>
                        <p className='opacity-60 mt-2'>Digital Experience</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
