import { useMemo } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Home, LogOut } from 'lucide-react';

// COMPONENTS
import { Sidebar } from './sidebar';
import { SidebarItem } from './sidebar-item';
import { Button } from '@/components/ui/button';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const sidebarItems = useMemo(() => {
        return [
            {
                icon: <Home />,
                text: 'Home',
                active: pathname === '/dashboard',
                href: '/dashboard',
            },
        ];
    }, [pathname]);

    return (
        <div className="flex">
            <Sidebar>
                {sidebarItems.map((item) => (
                    <Link href={item.href} key={item.text}>
                        <SidebarItem
                            icon={item.icon}
                            text={item.text}
                            active={item.active}
                        />
                    </Link>
                ))}

                <Button
                    className="mx-0 px-0 text-left"
                    variant="ghost"
                    onClick={() =>
                        signOut({
                            callbackUrl: `http://localhost:3000`,
                        })
                    }
                >
                    <SidebarItem
                        icon={<LogOut className="text-red-400" />}
                        text={'Log out'}
                    />
                </Button>
            </Sidebar>

            <div className="p-2 w-full h-screen overflow-y-auto">
                {children}
            </div>
        </div>
    );
};

export { Layout };
