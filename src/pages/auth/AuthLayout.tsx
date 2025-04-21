
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center">
            <span className="text-3xl font-bold text-primary">Go<span className="text-accent">Build</span></span>
          </Link>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className={cn(
            "bg-white px-6 py-8 shadow sm:rounded-lg sm:px-10"
          )}>
            <Outlet />
          </div>
          
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="font-medium text-primary hover:text-accent">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
