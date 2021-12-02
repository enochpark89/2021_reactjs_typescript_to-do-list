# To-Do-List

- We are going to use the recoil the store the list data.
- This project will help me understand how to utilize the recoil. 

# 1.0 Forms

- You can create a form using the React Hook Form. 
- In the real application, you are going to have many forms. 
- Also, you need to validate the form.

- Without the hook, below are the steps that we need to do
1. Create error state.
2. Condition check
3. Output the error message
ex:
```js
const [toDoError, setToDoError] = useState("");
const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
event.preventDefault();
if (toDo.length < 10) {
    return setToDoError("To do should be longer");
}
console.log("submit");
};
```

*How do you install react-hook-form?*
```
npm install react-hook-form
```

*How do you create a form using react-hook-form?*

- you can use the register function to create a form. 
```js
import { useForm } from "react-hook-form";
function ToDoList() {
    // useForm() function creates a form state and a function to update the form state.
  const { register, watch } = useForm();
  console.log(watch());
  return (
    <div>
      <form>
          {/* register will register many objects you state*/}
        <input {...register("email")} placeholder="Email" />
        <input {...register("firstName")} placeholder="First Name" />
        <input {...register("lastName")} placeholder="Last Name" />
        <input {...register("username")} placeholder="Username" />
        <input {...register("password")} placeholder="Password" />
        <input {...register("password1")} placeholder="Password1" />
        <button>Add</button>
      </form>
    </div>
  );
}
export default ToDoList;

```

# 2.0 Form validation

- You can use handleSubmit argument in the useForm() function to handle a form. 

```js
const { register, handleSubmit, formState } = useForm();
```

- When the valu is submitted, it will trigger onValid() function.

```js
const onValid = (data: any) => {
    console.log(data);
  };
  console.log(formState.errors);
```
- To set the variable as required, you use the below
```js
{...register("firstName", { required: true })}
```

- If require inputs, the mouse scroll will be focused on the empty fields. 
- There are more requirements that you can set by simply stating under the register() function. 
```js
{...register("firstName", { required: true })}
```

- The error handling is done by using formState.error. 
- You can also choose which error that you want to show on the screen .
```js
<input
    {...register("password1", {
    required: "Password is required",
    minLength: {
        value: 5,
        message: "Your password is too short.",
    },
    })}
```

# 3.0 Form Error

- you can use regex to set up the pattern of you fields as below

```javascript
<input
    {...register("email", {
    required: "Email is required",
    pattern: {
        value: /^[A-Za-z0-9._%+-]+@naver.com$/,
        message: "Only naver.com emails allowed",
    },
    })}
    placeholder="Email"
/>
```

- The message will show when the user did not fullfill the patterns or requirements. 

- If some fields are not required, you just put ? after the fields.
- 

# 4.0 Custom Validation

- You need to trigger an error in some occasions for eaxample when the server didn't send the correct information back. 
- We can validate based on the rule is possible. 
    - you can get the fields and validate with the API. If the username is already taken, we let the user know immediately. 

Manual validation set up:

```js
import React from "react";
import { useForm } from "react-hook-form";
```

- you can also add extra error on your form so that you may display extra error.
```js
import React from "react";
import { useForm } from "react-hook-form";
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}
```
- you can check whether the password1 is same as password as below.  you can send shouldfocus

```js
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // setError("extraError", { message: "Server offline." });
  };
```

- if the value does not include a set of string

```js
<input
    {...register("firstName", {
    required: "write here",
    validate: {
        noNico: (value) =>
        value.includes("nico") ? "no nicos allowed" : true,
        noNick: (value) =>
        value.includes("nick") ? "no nick allowed" : true,
    },
    })}
    placeholder="First Name"
/>
```

# Recap

1. start with the register function
2. Validation rules can be written in validate.
3. The error message gets automatically populated when the user does not fulfill the requirement. 
4. Three ways of validation: required: <mesasge>, pattern: <regex> pattern, validate: 
5. formstate: {error}: This can be put on the HTML to show the user what error they encountered. 

Final Product:
```js
import React from "react";
import { useForm } from "react-hook-form";

// interface IForm for userForm()

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    },
  });

  // validate whether the password and password1 are the same. If not, it will focus on the password1
  const onValid = (data: IForm) => {
    // This is a manual validation.
    if (data.password !== data.password1) {
      setError(
        "password1",
        { message: "Password are not the same" },
        { shouldFocus: true }
      );
    }
    // you can add setError if you want as below:
    //setError("extraError", { message: "Server offline." });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>

        <input
          {...register("lastName", { required: "write here" })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register("username", { required: "write here", minLength: 10 })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register("password", { required: "write here", minLength: 5 })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}
export default ToDoList;
```