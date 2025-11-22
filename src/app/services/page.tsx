export default function Services() {
    return (
        <div className='min-h-screen pt-32 px-6'>
            <h1 className='text-6xl font-bold mb-8'>Services</h1>
            <ul className='space-y-8'>
                {['Creative Direction', 'Web Development', '3D Motion', 'Brand Identity'].map((service) => (
                    <li key={service} className='text-4xl md:text-6xl font-bold opacity-50 hover:opacity-100 transition-opacity cursor-pointer border-b border-white/10 pb-4'>
                        {service}
                    </li>
                ))}
            </ul>
        </div>
    );
}
