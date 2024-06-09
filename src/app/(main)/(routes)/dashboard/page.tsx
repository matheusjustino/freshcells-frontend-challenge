'use client';

import { NextPage } from 'next';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';

// GRAPHQL
import { GET_USER } from '@/graphql/queries/user';

// INTERFACES
import { IUser } from '@/interfaces/user.interface';

// COMPONENTS
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';

const DashboardPage: NextPage = () => {
    const { data: session } = useSession();

    const { data, loading } = useQuery<{ user: IUser }>(GET_USER, {
        variables: {
            id: session?.user?.id,
        },
    });

    if (loading) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center h-screen">
                <Spinner size="lg" />
                <p className="text-slate-400">Loading...</p>
            </div>
        );
    }

    if (!data?.user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-slate-400">No content</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 items-center">
            <Input label="First name" value={data.user.firstName} disabled />
            <Input label="Last name" value={data.user.lastName} disabled />
        </div>
    );
};

export default DashboardPage;
