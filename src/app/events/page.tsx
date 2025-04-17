"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "regular" | "sportlink">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "upcoming" | "past">(
    "all"
  );

  return (
    <div className="container mx-auto p-4 sm:p-8 space-y-4">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center">
          Etkinlikler
        </h2>

        <div className="flex flex-col sm:flex-row w-full max-w-3xl items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
            <Input
              placeholder="Etkinlik ara..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex gap-2 w-full sm:w-auto">
              <Select
                value={typeFilter}
                onValueChange={(value: "all" | "regular" | "sportlink") =>
                  setTypeFilter(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Etkinlik Tipi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="regular">Normal</SelectItem>
                  <SelectItem value="sportlink">SportLink</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "upcoming" | "past") =>
                  setStatusFilter(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tümü</SelectItem>
                  <SelectItem value="upcoming">Yaklaşan</SelectItem>
                  <SelectItem value="past">Geçmiş</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <Card className="mx-auto max-w-3xl">
        <CardHeader className="border-b">
          <CardTitle>Etkinlikler</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-sm text-gray-500">
            Henüz etkinlik bulunmuyor.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
