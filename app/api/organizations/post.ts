import { NextRequest } from "next/server";
import { createResponse } from "@/src/lib/utils/createResponse";
import { organizationSchema } from "@/src/lib/zodSchema/organizationSchema";
import { prettifyError } from "zod";
import {
  InsertOrganization,
  InsertOrganizationMemberships,
  organizationMemberships,
  organizations,
  SelectOrganizations,
} from "@/src/db/schema/organizations";
import { createClient } from "@/src/lib/supabase/utils/server";
import { db } from "@/src/db";

const PATH = "API_ORGANIZATIONS_POST";

export interface OrganizationPostRequest {
  name: string;
  description: string;
}

export async function organizationsPost(req: NextRequest) {
  let body: FormData;

  // Parse Request
  try {
    body = await req.formData();
  } catch (_error) {
    return createResponse(
      400,
      "bad_request",
      "Invalid request",
      undefined,
      true,
      PATH
    );
  }

  // Parse formData
  const formValue = Object.fromEntries(
    body.entries()
  ) as unknown as OrganizationPostRequest;

  const { description, name } = formValue;

  // Validate Request
  if (!description || !name) {
    return createResponse(
      400,
      "bad_request",
      "Missing important parameters",
      undefined
    );
  }

  // Validate Values
  const validation = organizationSchema.safeParse(formValue);

  if (!validation.success) {
    return createResponse(
      200,
      "bad_request",
      prettifyError(validation.error),
      undefined
    );
  }

  // Validate Session
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return createResponse(
      401,
      "unauthorized",
      "Invalid session, login required",
      undefined
    );
  }

  const userId = data.user.id;
  const newOrganizationId = crypto.randomUUID();

  // Construct Request
  const newOrganization: InsertOrganization = {
    id: newOrganizationId,
    name,
    description,
    createdBy: userId,
    type: "regular",
    isVerified: false,
  };

  const newMembership: InsertOrganizationMemberships = {
    organizationId: newOrganizationId,
    userId,
    activatedAt: new Date(),
    membershipStatus: "active",
    role: "administrator",
  };

  // Execution
  try {
    const response = await db.transaction(async (tx) => {
      // Create Organization
      let newOrg: SelectOrganizations[];
      try {
        newOrg = await tx
          .insert(organizations)
          .values(newOrganization)
          .returning();
      } catch (_error) {
        throw new Error("Failed creating new Organization, aborting");
      }

      // Create Membership
      try {
        await tx.insert(organizationMemberships).values(newMembership);
      } catch (_error) {
        throw new Error("Failed creating membership, aborting");
      }

      return newOrg;
    });

    return createResponse(
      200,
      "success",
      "Organization and Membership created",
      response
    );
  } catch (error) {
    return createResponse(
      500,
      "fatal_error",
      (error as Error)?.message ?? "Unknown error",
      undefined,
      true,
      `${PATH}:${error}`
    );
  }
}
