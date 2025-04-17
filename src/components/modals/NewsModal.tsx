"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Badge } from "@/components/ui/badge";
import {
  FileEdit,
  Image as ImageIcon,
  Link2,
  Newspaper,
  User2,
  CheckCircle2,
  FileText,
  Globe,
  Dumbbell,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold">
            <Newspaper className="h-5 w-5 text-primary" />
            {news ? "Haberi Düzenle" : "Yeni Haber Ekle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Başlık
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Haber başlığı"
              className="border-muted"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary" className="flex items-center gap-2">
              <FileEdit className="h-4 w-4 text-muted-foreground" />
              Özet
            </Label>
            <Input
              id="summary"
              value={formData.summary || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, summary: e.target.value }))
              }
              placeholder="Kısa özet (opsiyonel)"
              className="border-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              İçerik
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="Haber içeriği"
              required
              className="min-h-[150px] border-muted"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="flex items-center gap-2">
                {formData.type === "sportlink" ? (
                  <Dumbbell className="h-4 w-4 text-[#22c55e]" />
                ) : (
                  <Globe className="h-4 w-4 text-muted-foreground" />
                )}
                Haber Tipi
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value: "genel" | "sportlink") =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger id="type" className="border-muted">
                  <SelectValue placeholder="Haber tipi seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="genel">
                    <span className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Genel
                    </span>
                  </SelectItem>
                  <SelectItem value="sportlink">
                    <span className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-[#22c55e]" />
                      SportLink
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                {formData.status === "published" ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <FileEdit className="h-4 w-4 text-amber-500" />
                )}
                Durum
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value: "published" | "draft") =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger id="status" className="border-muted">
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Yayında
                    </span>
                  </SelectItem>
                  <SelectItem value="draft">
                    <span className="flex items-center gap-2">
                      <FileEdit className="h-4 w-4 text-amber-500" />
                      Taslak
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                Görsel URL
              </Label>
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
                placeholder="Görsel bağlantısı (opsiyonel)"
                className="border-muted"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="flex items-center gap-2">
                <User2 className="h-4 w-4 text-muted-foreground" />
                Yazar
              </Label>
              <Input
                id="author"
                value={formData.metadata?.author || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    metadata: { ...prev.metadata, author: e.target.value },
                  }))
                }
                placeholder="Yazar adı (opsiyonel)"
                className="border-muted"
              />
            </div>
          </div>

          <DialogFooter className="flex items-center justify-between gap-4 sm:justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant={
                  formData.type === "sportlink" ? "default" : "secondary"
                }
                className={cn(
                  formData.type === "sportlink" &&
                    "bg-[#22c55e] hover:bg-[#22c55e]/90"
                )}
              >
                {formData.type === "sportlink" ? "SportLink" : "Genel"}
              </Badge>
              <Badge
                variant={
                  formData.status === "published" ? "outline" : "secondary"
                }
                className={cn(
                  formData.status === "published"
                    ? "border-green-500 text-green-500"
                    : "border-amber-500 text-amber-500"
                )}
              >
                {formData.status === "published" ? "Yayında" : "Taslak"}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-muted"
              >
                İptal
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                {news ? "Güncelle" : "Oluştur"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
