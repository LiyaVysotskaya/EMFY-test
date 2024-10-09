export const getStatusColor = (timestamp: number | null): string => {
  if (timestamp) {
    const today = new Date();

    const diffInDays = Math.floor(
      (timestamp * 1000 - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    console.log(diffInDays);

    if (diffInDays < 0) {
      return "red";
    } else if (diffInDays === 0) {
      return "yellow";
    } else if (diffInDays === 1) {
      return "green";
    } else {
      return "";
    }
  } else {
    return "red";
  }
};
