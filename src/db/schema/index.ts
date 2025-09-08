// Import Models
import { articles } from "./articles";
import { channels } from "./channels";
import { movements, movementMemberships } from "./movements";
import { organizations, organizationMemberships } from "./organizations";
import { profiles } from "./profiles";
import { threads } from "./threads";

// Export as batch
const schema = {
  articles,
  channels,
  movements,
  movementMemberships,
  organizations,
  organizationMemberships,
  profiles,
  threads,
};

export default schema;
