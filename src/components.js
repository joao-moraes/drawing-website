import { useState, useEffect, useRef } from 'react'

const ToolWindow = (props) => {
    const [tab, setTab] = useState('color')
}

const ColorPicker = (props) => {
    return (
        <div>
            <CanvasHue width={300} height={300} color={props.color} />
            <CanvasColor length={30} height={300} />
        </div>
    )
}

const CanvasHue = (props) => {
    const width = props.width
    const height = props.height
    const [x, setX] = useState(width)
    const [y, setY] = useState(height)
    const canvasRef = useRef(null)
    const selectRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        const gradientX = context.createLinearGradient(width, 0, 0, 0)
        gradientX.addColorStop(0, `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})`)
        gradientX.addColorStop(1, `rgb(255, 255, 255)`)
        context.fillStyle = gradientX
        context.fillRect(0, 0, width, height)

        const gradientY = context.createLinearGradient(0, 0, 0, height)
        gradientY.addColorStop(0, `rgba(0, 0, 0, 0)`)
        gradientY.addColorStop(1, `rgba(0, 0, 0, 1)`)
        context.fillStyle = gradientY
        context.fillRect(0, 0, width, height)
    }, [props.color])

    useEffect(() => {
        const canvas = selectRef.current
        const context = canvas.getContext('2d')

        context.lineWidth = 4
        context.strokeStyle = 'rgb(0, 0, 0)'
        context.fillStyle = `rgb(${props.color.red}, ${props.color.green}, ${props.color.blue})`

        context.beginPath()
        context.arc(x + 10, y + 10, 7, 0, 2 * Math.PI)
        context.stroke()
        context.fill()
        context.closePath()

        canvas.addEventListener('mousedown', handleClick)
        canvas.addEventListener('mousemove', handleMove)

        return () => {
            canvas.removeEventListener('mousedown', handleClick)
            canvas.removeEventListener('mousemove', handleMove)
        }
    }, [x, y, props.color])

    const handleClick = (event) => {
        if (event.offsetX < 10) {
            setX(0)
        } else if (event.offsetX > 310) {
            setX(300)
        } else {
            setX(event.offsetX - 10)
        }

        if (event.offsetY < 10) {
            setY(0)
        } else if (event.offsetY > 310) {
            setY(300)
        } else {
            setY(event.offsetY - 10)
        }
    }

    const handleMove = (event) => {

    }

    return (
        <div style={{position: 'relative'}} onClick={(event) => console.log(event.nativeEvent.offsetX)}>
            <canvas ref={selectRef} width={width + 20} height={height + 20} style={{position:'absolute', zIndex:1}}></canvas>
            <canvas ref={canvasRef} width={width} height={height} style={{borderStyle:'none', position:'absolute', top:10, left:10}}></canvas>
        </div>
    )
}

const CanvasColor = (props) => {

}

export { ToolWindow, ColorPicker, CanvasHue, CanvasColor };