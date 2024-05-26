
type Props = {
  name: string;
  preview: string;
}

export default function EachFile({ name,preview}:Props){
  return <>
    <div className={'rounded-md hover:bg-accent min-h-[100px] p-default_spacing flex flex-col group gap-default_spacing'}>
      <div>
        <img src={'/designer/img/folder.webp'} alt={'preview'} />
      </div>
      <div>
        <input value={name} className={'bg-background text-card-foreground text-sm w-full group-hover:bg-accent truncate focus:outline-primary focus:border-0 ring-primary'} />
      </div>
    </div>
  </>
}
