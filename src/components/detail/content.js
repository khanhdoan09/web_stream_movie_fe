const Content = (props)=>{
    return <p style={{color: 'rgb(229 231 235)'}}> {props.content?.toString().slice(3, -4)} </p>
}

export default Content;