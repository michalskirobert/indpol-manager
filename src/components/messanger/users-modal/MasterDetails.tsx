import { CustomButton } from "@/components/shared/button/CustomButton";
import { useAppDispatch } from "@/store";
import { useCreateChatroomMutation } from "@/store/services/messages";
import { setSelectedUser } from "@/store/slices/messages";
import { TableData } from "@/types/table";
import { UserProps } from "@/types/user";
import { Avatar, Typography } from "@material-tailwind/react";
import { Send } from "lucide-react";

interface Props {
  data: TableData<UserProps> | undefined;
  isFetching: boolean;
  toggle: () => void;
}

export const MasterDetails = ({ data, isFetching, toggle }: Props) => {
  const [create, { isLoading }] = useCreateChatroomMutation();

  const dispatch = useAppDispatch();

  const createChatroom = async (user: UserProps) => {
    await create({ recipientId: user._id.toString() }).unwrap();

    dispatch(setSelectedUser(user));

    toggle();
  };

  return (
    <tbody className="relative">
      {isFetching ? (
        <div>Loading...</div>
      ) : !data?.items?.length ? (
        <Typography variant="h5" className="absolute top-20 w-full text-center">
          No data
        </Typography>
      ) : (
        data?.items.map((user, index) => {
          const { _id, fullname, profileImgSrc, email, jobPosition, gender } =
            user;

          const isLast = index === data?.items.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={_id.toString()}>
              <td className={classes}>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={
                      profileImgSrc || `/images/user/empty_img_${gender}.jpg`
                    }
                    alt={fullname}
                    size="sm"
                  />
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {fullname}
                    </Typography>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal opacity-70"
                    >
                      {email}
                    </Typography>
                  </div>
                </div>
              </td>
              <td className={classes}>
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {jobPosition}
                  </Typography>
                </div>
              </td>
              {/* <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={online ? "online" : "offline"}
                            color={online ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td> */}
              <td className={classes}>
                <CustomButton
                  icon={<Send className="h-5 w-5" />}
                  variant="text"
                  color="blue"
                  className="text-xs"
                  isLoading={isLoading}
                  onClick={() => createChatroom(user)}
                />
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  );
};
