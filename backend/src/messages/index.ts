type MessageTypes = "success";

const getMessage = (type: MessageTypes, subject: string) => {
  switch (type) {
    case "success":
      return `${subject} obtained successfully`;

    default:
      break;
  }
};

export default getMessage;
