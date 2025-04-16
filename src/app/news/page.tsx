"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, ChevronDown, Plus } from "lucide-react";
import { NewNewsModal } from "@/components/modals/NewNewsModal";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "published" | "draft";
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [news, setNews] = useState<News[]>([
    {
      id: "1",
      title: "Yeni Spor Salonu Açılıyor",
      content:
        "Yeni spor salonumuz 1 Nisan'da açılıyor. Modern ekipmanlar ve geniş antrenman alanlarıyla hizmetinizde olacak. Açılışa özel ilk ay ücretsiz deneme fırsatını kaçırmayın!",
      date: "2024-03-10",
      status: "published",
    },
    {
      id: "2",
      title: "Yaz Kampı Kayıtları Başladı",
      content:
        "Yaz kampı kayıtları için son başvuru tarihi yaklaşıyor. 7-14 yaş arası çocuklar için özel programlar, profesyonel eğitmenler eşliğinde spor ve eğlence dolu bir yaz fırsatı!",
      date: "2024-03-15",
      status: "draft",
    },
  ]);

  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditNews = (id: string, updatedNews: Partial<News>) => {
    setNews(
      news.map((item) => (item.id === id ? { ...item, ...updatedNews } : item))
    );
    toast.success("Haber başarıyla güncellendi");
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">
          Haber & Duyuru Yönetimi
        </h2>

        <div className="flex w-full max-w-2xl items-center justify-between space-x-4">
          <Input
            placeholder="Haber ara..."
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <NewNewsModal />
        </div>
      </div>

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Tüm Haberler</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredNews.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-lg px-4"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{item.title}</span>
                      <Badge
                        variant={
                          item.status === "published" ? "default" : "secondary"
                        }
                      >
                        {item.status === "published" ? "Yayında" : "Taslak"}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString("tr-TR")}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {item.content}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleEditNews(item.id, {
                            status:
                              item.status === "published"
                                ? "draft"
                                : "published",
                          })
                        }
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        {item.status === "published" ? "Taslağa Al" : "Yayınla"}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteNews(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Sil
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
