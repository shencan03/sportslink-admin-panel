"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const newsSchema = z.object({
  title: z.string().min(1, "Başlık zorunludur"),
  content: z.string().min(1, "İçerik zorunludur"),
  summary: z.string().optional(),
  status: z.enum(["published", "draft"]),
  type: z.enum(["genel", "sportlink"]),
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
      aspectRatio: z.enum(["video", "square", "portrait"]),
    })
    .optional(),
  metadata: z
    .object({
      author: z.string().optional(),
      lastModified: z.string().optional(),
      viewCount: z.number().optional(),
    })
    .optional(),
});

interface NewsImage {
  url: string;
  alt: string;
  aspectRatio: "video" | "square" | "portrait";
}

interface NewsMetadata {
  author?: string;
  lastModified?: string;
  viewCount?: number;
}

interface News {
  id: string;
  title: string;
  content: string;
  summary?: string;
  date: string;
  status: "published" | "draft";
  type: "genel" | "sportlink";
  image?: NewsImage;
  metadata: NewsMetadata;
}

interface NewsInput {
  title: string;
  content: string;
  summary?: string;
  status: "published" | "draft";
  type: "genel" | "sportlink";
  image?: NewsImage;
  metadata?: Partial<NewsMetadata>;
}

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news: News | null;
  onSave: (data: NewsInput) => void;
}

export function NewsModal({
  open,
  onOpenChange,
  news,
  onSave,
}: NewsModalProps) {
  const form = useForm<NewsInput>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      status: "draft",
      type: "genel",
    },
  });

  const [formData, setFormData] = useState<NewsInput>(() => ({
    title: news?.title || "",
    content: news?.content || "",
    summary: news?.summary || "",
    status: news?.status || "draft",
    type: news?.type || "genel",
    image: news?.image,
    metadata: {
      author: news?.metadata?.author,
    },
  }));

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
        summary: news.summary || "",
        status: news.status,
        type: news.type,
        image: news.image,
        metadata: {
          author: news.metadata.author,
        },
      });
    } else {
      setFormData({
        title: "",
        content: "",
        summary: "",
        status: "draft",
        type: "genel",
        image: undefined,
        metadata: {
          author: undefined,
        },
      });
    }
  }, [news]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {news ? "Haberi Düzenle" : "Yeni Haber Ekle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Başlık</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Haber başlığı"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Özet</Label>
            <Input
              id="summary"
              value={formData.summary || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, summary: e.target.value }))
              }
              placeholder="Kısa özet (opsiyonel)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">İçerik</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Haber içeriği"
              required
              className="min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Haber Tipi</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "genel" | "sportlink") =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Haber tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genel">Normal Haber</SelectItem>
                  <SelectItem value="sportlink">SportLink</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Durum</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "published" | "draft") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Yayında</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Görsel URL</Label>
              <Input
                id="image"
                value={formData.image?.url || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    image: e.target.value
                      ? {
                          url: e.target.value,
                          alt: prev.title,
                          aspectRatio: "video",
                        }
                      : undefined,
                  }))
                }
                placeholder="Görsel URL (opsiyonel)"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="hover:border-[#ef4444] hover:text-[#ef4444]"
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="bg-[#22c55e] text-white hover:bg-[#22c55e]/90"
            >
              {news ? "Güncelle" : "Oluştur"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
