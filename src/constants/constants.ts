export const ERROR_MESSAGES = {
  TOKEN_ERROR: "Error generating access token",
  USER_EXISTS: "User already exists",
  USER_NOT_FOUND: "User not found",
  IMPROPER_DATA: "Provide proper credentials",
  UNAUTHORIZED :"Unauthorized access",
  NOT_UPDATED: "Failed to update user",
  NOT_DELETED:"Failed to delete user",
  NOT_ADDED:"Failed to add user",
  INVALID_DATA:"Invalid username or password"
 
};


export const SUCCESS_MESSAGES = {
  CREATED: "User created successfully",
  DELETED: "User deleted successfully", 
  UPDATED:"User updated successfully"
};

export const SUCCESS_MESSAGES_STATUS ={
  CREATED: 201,
  DELETED: 204,
  SUCCESS:200,
}

export const ERROR_MESSAGE_STATUS={

  NOT_FOUND:404,
  INTERNAL_SERVER_ERROR:500,
  BAD_REQUEST:400,
  UNAUTHORIZED_ACCESS:401

}