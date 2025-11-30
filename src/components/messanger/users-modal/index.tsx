import {
  Avatar,
  CardBody,
  Chip,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { CustomButton } from "../../shared/button/CustomButton";
import { ChevronsUpDownIcon, Send } from "lucide-react";
import { useGetUsersQuery } from "@/store/services/users/users";
import { MasterDetails } from "./MasterDetails";

const columns = ["Fullname", "Position", "Action"];

interface Props {
  open: boolean;
  toggle: () => void;
}

export const UsersModal = ({ open, toggle }: Props) => {
  const { data, isFetching } = useGetUsersQuery();

  return (
    <Dialog open={open} handler={toggle}>
      <DialogHeader>Send message to:</DialogHeader>
      <DialogBody>
        <CardBody className="min-h-[300px] overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {columns.map((head, index) => (
                  <th
                    key={head}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== columns.length - 1 && (
                        <ChevronsUpDownIcon
                          strokeWidth={2}
                          className="h-4 w-4"
                        />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <MasterDetails {...{ data, isFetching, toggle }} />
          </table>
        </CardBody>
      </DialogBody>
      <DialogFooter>
        <CustomButton
          variant="text"
          color="red"
          onClick={toggle}
          className="mr-1"
          content="Close"
        />
      </DialogFooter>
    </Dialog>
  );
};
