import { NextPage } from 'next';
import Link from 'next/link';

// COMPONENTS
import { Button } from '@/components/ui/button';

const NotFoundPage: NextPage = () => {
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
            <h1 className="text-slate-600 text-xl">Something went wrong</h1>
            <Link href="/">
                <Button>Home</Button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
