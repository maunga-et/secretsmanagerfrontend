import {Avatar} from "antd";

const NavBar = () => {
    return (
        <div
            className='d-flex justify-content-between align-items-center py-3 px-4 bg-light shadow-sm'
        >
            <h4>Secrets Manager</h4>
            <Avatar shape={"circle"} size={"large"} />
        </div>
    )
}

export default NavBar;