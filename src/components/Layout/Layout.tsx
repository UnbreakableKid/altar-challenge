import { useAtom } from 'jotai';
import React from 'react'
import { generationState, gridState, codeState, inputValueState } from '../../utils/jotai';
import { trpc } from '../../utils/trpc';
import Navbar from './Navbar';


const Layout = ({ children }: any) => {
    const [generateGrid] = useAtom(generationState)
    const [grid, setGrid] = useAtom(gridState)
    const [_, setCode] = useAtom(codeState)
    const [inputValue] = useAtom(inputValueState);



    trpc.grid.generateWithCharacter.useQuery({ char: inputValue }, {
        refetchInterval: 2000, enabled: generateGrid === 'generate', cacheTime: 0, onSuccess: (data) => {
            setGrid(data)
        }
    });

    trpc.code.generate.useQuery({ grid: grid }, {
        enabled: !!grid && generateGrid === 'generate', cacheTime: 0, onSuccess: (data) => {
            const { value, firstChar, firstVal, lastVal, grid, secondChar, seconds } = data;
            setCode({ value: value, firstChar: firstChar!, secondChar: secondChar!, firstVal: firstVal!, lastVal: lastVal!, seconds: seconds!, grid: grid! })
        }
    });

    return (<>
        <Navbar />
        <main>
            {children}
        </main>
    </>);
}
export default Layout;