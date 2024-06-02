import React from 'react'

type Props = {
  label:string;
  children: React.ReactNode;
}

export default function EachPropertyLayout({ children, label }:Props){
  return <>
    <div className={'dark flex items-center gap-default_spacing justify-between'}>
      <small>{label}</small>
      <div className={'min-w-[70%] max-w-[70%]'}>
        {children}
      </div>
    </div>
  </>
}
