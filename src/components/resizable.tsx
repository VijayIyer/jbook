import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
  }

const Resizable: React.FC<ResizableProps> = ({ direction, children}) => {
    let resizableProps: ResizableBoxProps;

    if(direction === 'vertical') {
        resizableProps = {
            className: 'resize-horizontal',
            minConstraints:[Infinity, 24],
            maxConstraints:[Infinity, window.innerHeight * 0.9],
            height: 300, 
            width: Infinity,
            resizeHandles: ['s']
        };
    } else {
        resizableProps =  {
            minConstraints: [window.innerWidth *  0.2, Infinity],
            maxConstraints: [window.innerWidth * 0.75, Infinity],
            height: Infinity, 
            width: window.innerWidth * 0.75,
            resizeHandles: ['e']
        };
    }
    return (
        <ResizableBox
            minConstraints={[Infinity, 24]}
            maxConstraints={[Infinity, window.innerHeight * 0.9]}
            height={200} 
            width={Infinity}
            resizeHandles={['s']}>
                {children}
        </ResizableBox>
    )
};

export default Resizable;