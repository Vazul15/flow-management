import { useState } from "react";
import { SidebarLeft } from "@/components/nav/sidebar-left/sidebar-left";
import { SidebarRight } from "@/components/nav/sidebar-right";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useParams } from "react-router-dom";

export default function GroupManagerPage() {
  const [content, setContent] = useState<JSX.Element | null>(null);
  const { groupName } = useParams<{ groupName: string }>();

  return (
    <div className="bg-navbar">
      <SidebarProvider>
        <SidebarLeft setContent={setContent} />
        <SidebarInset>
          <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2 bg-navbar">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="line-clamp-1">
                      {groupName ? groupName : ""}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 bg-[var(--content-background)]">
                      {content??(
              <div>
                <h1>Flow Management</h1>
              </div>
            )}
          </div>
        </SidebarInset>
        <SidebarRight />
      </SidebarProvider>
    </div>
  );
}
