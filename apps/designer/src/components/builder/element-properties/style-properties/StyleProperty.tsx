import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


export default function StyleProperty(){
  return <>
    <AccordionItem value="style">
      <AccordionTrigger
        className={'px-default_spacing py-default_spacing'}
      >
        Style
      </AccordionTrigger>
      <AccordionContent>
        <h1 key={crypto.randomUUID()}>
          Yes. It adheres to the WAI-ARIA design pattern.
        </h1>
      </AccordionContent>
    </AccordionItem>
  </>
}

