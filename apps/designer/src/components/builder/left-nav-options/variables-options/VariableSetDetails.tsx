import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import DefaultTooltip from '@/components/DefaultTooltip';
import { Button } from '@/components/ui/button';
import { TbPlus, TbTrash } from 'react-icons/tb';
import { cn } from '@/lib/utils';


export default function VariableSetDetails({ children }: React.PropsWithChildren) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    return <div className='min-h-[calc(100vh-50px)] max-h-[calc(100vh-50px)] bg-card w-[500px] fixed bottom-0 left-[calc(50px+250px)] z-50 text-foreground animate__animated animate__fadeInLeft animate__faster'>
        <Table>
            <TableHeader className='max-h-[2.20rem]'>
                <TableRow>
                    <TableHead className="min-w-[30px] pl-5 h-[2.20rem]"></TableHead>
                    <TableHead className="min-w-[100px] pl-5 h-[2.20rem]">Name</TableHead>
                    <TableHead className="min-w-[100px] pl-5 h-[2.20rem]">Value</TableHead>
                    <TableHead>
                        <DefaultTooltip content={'Add variable'} side={'top'} >
                            <Button variant="ghost" size="icon" className={cn('hover:bg-card hover:text-card-foreground text-muted')}>
                                <TbPlus className="h-4 w-4" />
                            </Button>
                        </DefaultTooltip>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    new Array(7).fill(null).map((_, i) => {
                        return <TableRow className='text-foreground group' key={i}>
                            <TableCell className='p-default_spacing'>

                            </TableCell>
                            <TableCell className='p-default_spacing'>
                                <div className='max-w-[50%]'>
                                    <Input className='border-0 hover:bg-card focus:bg-card focus:ring-border' placeholder='Enter name' value='The name' />
                                </div>
                            </TableCell>
                            <TableCell className='p-default_spacing'>
                                <div className='max-w-[50%]'>
                                    <Input className='border-0 hover:bg-card focus:bg-card focus:ring-border' placeholder='Enter value' value="48px" />
                                </div>
                            </TableCell>
                            <TableCell className='p-default_spacing'>
                                <DefaultTooltip content={'Delete variable'} side={'top'} >
                                    <Button variant="ghost" size="icon" className={cn('hover:bg-card hover:text-danger text-muted opacity-0 group-hover:opacity-100')}>
                                        <TbTrash className="h-4 w-4" />
                                    </Button>
                                </DefaultTooltip>
                            </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </div>
}
