import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import { CiMenuKebab } from "react-icons/ci";

interface PropTypes {
    onPressButtonDetail: () => void;
    onPressButtonDelete: () => void;
}

const DropdownAction = (props: PropTypes) => {
    const { onPressButtonDetail, onPressButtonDelete } = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="md" variant="light">
                    <CiMenuKebab className="text-default-700" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu>
                <DropdownItem onPress={onPressButtonDetail} key="detail-event-button">
                    Detail
                </DropdownItem>
                <DropdownItem
                    className="text-danger-500"
                    key="delete-event"
                    onPress={onPressButtonDelete}
                >
                    Delete
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default DropdownAction;
