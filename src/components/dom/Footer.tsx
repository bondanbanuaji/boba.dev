export default function Footer() {
    return (
        <footer className='w-full py-8 px-6 flex justify-between items-end text-xs uppercase tracking-widest opacity-50'>
            <div>
                <p>&copy; {new Date().getFullYear()} &lt;Boba.dev /&gt;</p>
            </div>
            <div className='flex gap-4'>
                <a href='#' className='hover:opacity-100 transition-opacity'>Twitter</a>
                <a href='#' className='hover:opacity-100 transition-opacity'>Instagram</a>
                <a href='#' className='hover:opacity-100 transition-opacity'>LinkedIn</a>
            </div>
        </footer>
    );
}
