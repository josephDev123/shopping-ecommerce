export type FlutterwaveHostedLinkResponse = {
  status: string; // fixed status
  message: string; // message about the response
  data: {
    link: string; // the hosted payment link
  };
};
