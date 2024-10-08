export type TGeneralResponse = {
  _page: number;
  _links: TPageLinks;
  _embedded: {
    leads: TDeal[];
  };
};

export type TDeal = {
  id: number;
  name: string;
  price: number;
  responsible_user_id: number;
  group_id: number;
  status_id: number;
  pipeline_id: number;
  loss_reason_id: number | null;
  created_by: number;
  updated_by: number;
  created_at: number;
  updated_at: number;
  closed_at: number | null;
  closest_task_at: number | null;
  is_deleted: boolean;
  custom_fields_values: null | unknown;
  score: number | null;
  account_id: number;
  labor_cost: number | null;
  _links: {
    self: TLink;
  };
  _embedded: {
    tags: any[];
    companies: any[];
  };
};

type TLink = {
  href: string;
};

type TPageLinks = {
  self: TLink;
  next?: TLink;
};
