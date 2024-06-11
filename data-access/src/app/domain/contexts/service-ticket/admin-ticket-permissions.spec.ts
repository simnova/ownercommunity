export interface AdminTicketPermissions {
  canCreateTickets: boolean;
  canManageTickets: boolean;
  canAssignTickets: boolean;
  canWorkOnTickets: boolean;
  isEditingOwnTicket: boolean;
  isEditingAssignedTicket: boolean;
  isSystemAccount: boolean;
}
