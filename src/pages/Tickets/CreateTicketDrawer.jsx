/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketSchema } from "../../schema/Ticket";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCreateTicketMutation } from "@/api/ticketsApiSlice"; // Assuming you have an API slice for tickets
// import { useEffect, useState } from "react";

export function CreateTicketDrawer() {
  // const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch('/api/users')
  //     .then(response => response.json())
  //     .then(data => setUsers(data))
  //     .catch(error => console.error('Error fetching users:', error));
  // }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(ticketSchema) });

  const [createTicket, { isLoading, isError, isSuccess, error }] =
    useCreateTicketMutation();

  const onSubmit = async (payload) => {
    try {
      await createTicket({
        title: payload.title,
        desc: payload.desc,
        isFixed: payload.isFixed,
      });

      reset();
    } catch (error) {
      console.error("Failed to create a new ticket", error);
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Create Ticket
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Ticket</SheetTitle>
          <SheetDescription>Add a new ticket to the system</SheetDescription>
        </SheetHeader>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="desc"
            >
              Description
            </label>
            <textarea
              id="desc"
              {...register("desc", { required: true })}
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.desc && (
              <p className="mt-1 text-sm text-red-600">
                {errors.desc.message}
              </p>
            )}
          </div>

          {/* isFixed */}
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="isFixed">
              Fixed
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="true"
                  {...register("isFixed", { required: true })}
                  className="form-radio"
                />
                <span className="ml-2">True</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input
                  type="radio"
                  value="false"
                  {...register("isFixed", { required: true })}
                  className="form-radio"
                />
                <span className="ml-2">False</span>
              </label>
            </div>
            {errors.isFixed && (
              <p className="mt-1 text-sm text-red-600">{errors.isFixed.message}</p>
            )}
          </div>

          {/* User */}
          {/* <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="users"
            >
              User
            </label>
            <select
              id="users"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Choose User</option>
              {users.map((user, index) => (
                <option key={index} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div> */}

          <button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-500 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
