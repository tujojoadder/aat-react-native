// utils/errorUtils.ts

export const getErrorMessage = (error: any): string => {
    if (error?.data?.message) {
      return error.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  };
  