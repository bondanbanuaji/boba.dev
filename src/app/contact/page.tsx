export default function Contact() {
    return (
        <div className='min-h-screen pt-32 px-6 flex flex-col justify-between'>
            <div>
                <h1 className='text-6xl font-bold mb-8'>Get in Touch</h1>
                <p className='text-xl mb-12'>Let&apos;s build something impossible together.</p>

                <form className='max-w-md space-y-6'>
                    <div>
                        <label className='block text-sm uppercase mb-2'>Name</label>
                        <input type='text' className='w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white' />
                    </div>
                    <div>
                        <label className='block text-sm uppercase mb-2'>Email</label>
                        <input type='email' className='w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white' />
                    </div>
                    <div>
                        <label className='block text-sm uppercase mb-2'>Message</label>
                        <textarea className='w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-white h-32'></textarea>
                    </div>
                    <button className='px-8 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors'>
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
