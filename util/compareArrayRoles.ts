export const compareArrayRoles = (officer_roles_fomarted: any[], roles_from_client: any[]) => {
    let roles_revoked = [];
    let new_roles = [];
  
    // Kiểm tra các phần tử trong mảng a
    officer_roles_fomarted.forEach(element => {
        if (!roles_from_client.includes(element)) {
          roles_revoked.push(element);
        }
    });
  
    // Kiểm tra các phần tử trong mảng b
    roles_from_client.forEach(element => {
        if (!officer_roles_fomarted.includes(element)) {
          new_roles.push(element);
        }
    });
  
    return { roles_revoked, new_roles };
}