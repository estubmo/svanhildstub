type MedusaError = {
  response: {
    data:
      | {
          message: string;
        }
      | string;
    status: number;
    headers: unknown;
  };
  request: unknown;
  message: string;
};
export default function medusaError(error: MedusaError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Status code:', error.response.status);
    console.error('Headers:', error.response.headers);

    // Extracting the error message from the response data
    const message: string =
      typeof error.response.data === 'object' &&
      Object.hasOwn(error.response.data, 'message')
        ? error.response.data.message
        : typeof error.response.data === 'string'
          ? error.response.data
          : 'Unknown error';

    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + '.');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response received: ' + error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error('Error setting up the request: ' + error.message);
  }
}
