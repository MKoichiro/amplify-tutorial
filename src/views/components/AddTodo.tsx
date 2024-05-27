import { Box, Button, FormControl, FormErrorMessage, Input } from "@chakra-ui/react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

type FormData = {
  content: string;
}
const AddTodo = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    alert(data.content);
    reset();
  }

  return (
    <Box display="flex" justifyContent="center">
      <form
          onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          isInvalid={errors.content ? true : false}
          w={{base: '90vw', sm: '80vw', md: '70vw', lg: '60vw'}}>
          <Input id="content" placeholder="Enter todo" {...register("content", {required: "Please enter todo."})}/>
          <FormErrorMessage>
            {errors.content && String(errors.content.message)}
          </FormErrorMessage>
        </FormControl>
        <Box w="100%" display="flex" justifyContent="flex-end">
          <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTodo