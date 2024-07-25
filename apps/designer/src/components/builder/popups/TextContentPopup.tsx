import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { TbPencil } from 'react-icons/tb';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { AppStore } from '@/redux/store';
import { useBuilder } from '../hooks/builder.hooks';



type Props = {
    text_content?: string;
}

export default function TextContentPopup({ text_content }: Props) {
    const [show, setShow] = useState(true);
    const [textContent, setTextContent] = useState(text_content);
    const { active_element } = useSelector((state: AppStore) => state.renderer);
    const { updateElementData } = useBuilder();

    const handleSave = () => {
        if (textContent && active_element[0] && active_element.length === 1) {
            updateElementData({
                element_id: active_element[0].dnd_id,
                data: {
                    ...active_element[0],
                    element_data: {
                        ...active_element[0].element_data,
                        text_content: textContent,
                    },
                }
            })
            setShow(false);
        }
    }

    useEffect(() => {
        setTextContent(text_content);
    }, [text_content])

    if (!show) {
        return null;
    }
    return (
        <>
            <Dialog open defaultOpen onOpenChange={e => setShow(e)}>
                <DialogContent className='dark'>
                    <DialogHeader className='text-card-foreground'>
                        <DialogTitle className='mb-default_spacing text-muted-foreground flex gap-default_spacing items-center'>
                            <TbPencil size={20} /> Edit text</DialogTitle>
                        <DialogDescription>
                            <div className='flex flex-col gap-default_spacing'>
                                <Textarea
                                    onChange={e => setTextContent(e.target.value)}
                                    className='text-card-foreground border-border focus:bg-background' value={textContent} />
                                <Button disabled={!textContent} onClick={handleSave}>Save</Button>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}