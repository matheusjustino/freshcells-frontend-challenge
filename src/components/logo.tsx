import Image from 'next/image';

const Logo: React.FC = () => {
    return (
        <Image
            fill
            quality={80}
            priority
            src="/freshcells-logo.png"
            alt="Logo"
            className="!relative object-contain"
        />
    );
};

export { Logo };
