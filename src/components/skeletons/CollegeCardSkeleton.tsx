"use client";

import { Card } from "@/components/ui/card";

export function CollegeCardSkeleton() {
    return (
        <Card className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-black h-full flex flex-col">
            {/* Image skeleton */}
            <div className="relative h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />

            <div className="pt-8 pb-6 px-6 flex flex-col flex-1">
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4 w-3/4" />

                {/* Info lines skeleton */}
                <div className="space-y-3 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    {/* Tags skeleton */}
                    <div className="flex gap-2 mb-4">
                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse w-16" />
                        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse w-20" />
                    </div>

                    {/* Button skeleton */}
                    <div className="h-9 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse w-full" />
                </div>
            </div>
        </Card>
    );
}

export function NoticeSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex md:flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg p-4 w-full md:w-24 h-20 md:h-24 animate-pulse" />
                <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-5/6" />
                </div>
            </div>
        </div>
    );
}

export function StatCardSkeleton() {
    return (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-lg flex-shrink-0" />
            <div className="space-y-2 flex-1">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-16" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-24" />
            </div>
        </div>
    );
}
