import React from 'react'

type Props = {
    children: any;
}

export function AuthLayout({ children }: Props) {
    return (
        <div className="w-full lg:grid lg:grid-cols-2 min-h-screen">
            <div className="flex items-center justify-center py-12">
                {children}
            </div>
            <div className="hidden bg-muted lg:block">
                {/* <video preload="auto" src="https://cdn.dribbble.com/userupload/16162209/file/original-55035668a71334e0451b251b6a44579c.mp4" playsInline loop draggable="false" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" autoPlay></video> */}
                <img
                    src="https://cdn.worktechacademy.com/uploads/2016/08/AdobeStock_64564512.jpeg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover object-left dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
