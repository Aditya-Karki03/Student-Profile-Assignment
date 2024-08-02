import zod from "zod";

export const userDataValidation = (userData) => {
  const studentData = zod.object({
    firstname: zod
      .string()
      .min(2, { message: "Firstname must be more than 2 characters!" }),
    lastname: zod
      .string()
      .min(1, { message: "Lastname must be more than 1 characters" }),
    age: zod.string().min(1, { message: "Age must be provided!" }),
    email: zod.string().email(),
    phoneNo: zod.string().min(10, { message: "Provide valid Phone number!" }),
    password: zod
      .string()
      .min(8, { message: "Password should be minimum 8 characters!" }),
  });

  try {
    const { success } = studentData.safeParse(userData);
    if (!success) {
      return {
        success: false,
        message: "Invalid Input! Please try again!",
      };
    }
    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong! Please try again",
    };
  }
};

export const userSignInDataValidation = (userSignInData) => {
  const signInSchema = zod.object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, { message: "Password should be minimum 8 charcters" }),
  });
  try {
    const { success, error } = signInSchema.safeParse(userSignInData);
    if (!success) {
      return {
        success: false,
        message: error.message,
      };
    }
    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong please try again!",
    };
  }
};

export const coursesInfoValidation = (coursesInfo) => {
  const courseSchema = zod.object({
    courseName: zod.string().min(1),
    instructor: zod.string().min(1),
    duration: zod.string().min(1),
  });

  const coursesSchema = zod.object({
    data: zod.array(courseSchema),
  });

  try {
    const { success, error } = coursesSchema.safeParse(coursesInfo);
    if (!success) {
      return {
        success: true,
        message: "Wrong Format User Input! Please try again!",
      };
    }
    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong! Please try again!",
    };
  }
};

export const educationalInfoValidation = (eduInfo) => {
  const eduInfoSchema = zod.object({
    name: zod.string().min(1),
    degree: zod.string().min(1),
    attendance: zod.string().min(1),
  });

  const educationalInfosScehma = zod.object({
    data: zod.array(eduInfoSchema),
  });
  try {
    const { success, error } = educationalInfosScehma.safeParse(eduInfo);
    if (!success) {
      return {
        success: false,
        message: "Wrong Format User Input! Please try again!",
      };
    }
    return {
      success: true,
      message: null,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong please try again!!",
    };
  }
};
