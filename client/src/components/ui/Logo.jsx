import logo from '../../assets/images/logo-5.svg'

export default function Logo({className}){
    return <div className={className}>
        <img className={`w-full h-auto `} src={logo} at="logo"/>
    </div>
}
