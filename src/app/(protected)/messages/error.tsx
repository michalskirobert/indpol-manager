"use client";

import { CustomButton } from "@/components/shared/button/CustomButton";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <Card>
      <Typography variant="h1" className="p-4 text-center text-black">
        Unexpected Error Occurred
      </Typography>

      <CardHeader floated={false} shadow={false} className="px-4 pb-2 pt-0">
        <Typography variant="h5" color="blue-gray">
          Messenger failed to load
        </Typography>
      </CardHeader>

      <CardBody className="px-4">
        <Typography className="mb-4">
          The messaging module was unable to retrieve required data from the
          server.
        </Typography>

        <Typography className="mb-4">
          This issue usually appears when the server is temporarily unreachable,
          overloaded, or undergoing maintenance. Your messages and account data
          are safe — the app simply cannot fetch them at the moment.
        </Typography>

        <Typography className="mb-4">
          If the problem continues for a longer period, please reach out for
          assistance:
        </Typography>

        <Typography className="font-bold">
          <Link className="underline" href="mailto:rm.software.lab@gmail.com">
            Contact Administrator: Robert Michalski
          </Link>
        </Typography>
      </CardBody>

      <CardFooter className="px-4 pb-4 pt-0">
        <CustomButton
          icon={<RefreshCcw />}
          onClick={() => window.location.reload()}
          content="Reload the page"
        />
      </CardFooter>
    </Card>
  );
}
