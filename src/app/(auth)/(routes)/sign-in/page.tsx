'use client';

import { useCallback, useState } from 'react';
import { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// COMPONENTS
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '@/components/logo';

const formSchema = z.object({
    identifier: z.string().min(1),
    password: z
        .string()
        .min(1, { message: 'Password must contain at least 1 character(s)' }),
});

type FormType = z.infer<typeof formSchema & FieldValues>;

const SignInPage: NextPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        values: {
            identifier: '',
            password: '',
        },
    });

    const handleLogin: SubmitHandler<FormType> = useCallback(
        async (data, event) => {
            event?.preventDefault();

            try {
                setIsLoading(true);

                toast.promise(
                    signIn(`credentials`, {
                        ...data,
                        redirect: false,
                    }),
                    {
                        loading: `Submitting...`,
                        success: `Logged in successfully`,
                        error: `Something went wrong`,
                    },
                );
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        },
        [],
    );

    return (
        <div className="border-2 max-w-[480px] max-h-[720px] p-2 w-full rounded-md shadow-md">
            <div className="w-full h-[32px]">
                <Logo />
            </div>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col pt-6 gap-3"
            >
                <Input
                    id="identifier"
                    placeholder="Identifier"
                    type="text"
                    register={register('identifier', { required: true })}
                    errors={errors}
                />
                <Input
                    id="password"
                    placeholder="Password"
                    type="password"
                    register={register('password', { required: true })}
                    errors={errors}
                />
                <Button loading={isLoading} disabled={isLoading}>
                    Sign in
                </Button>
            </form>
        </div>
    );
};

export default SignInPage;
