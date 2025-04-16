"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { CalendarIcon, ImageIcon, Save, X } from "lucide-react";
import { toast } from "sonner";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "published" | "draft";
  type: "regular" | "sportlink";
  image?: string;
}

interface NewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  news?: News | null;
  onSave?: (data: Omit<News, "id" | "date">) => void;
}

export function NewsModal({
  open,
  onOpenChange,
  news,
  onSave,
}: NewsModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"regular" | "sportlink">("regular");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [publishDate, setPublishDate] = useState<Date | undefined>(new Date());
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<Omit<News, "id" | "date"> | null>(
    null
  );

  useEffect(() => {
    if (news) {
      setTitle(news.title);
      setContent(news.content);
      setType(news.type);
      setImagePreview(news.image || null);
      setPublishDate(news.date ? new Date(news.date) : new Date());
    } else {
      setTitle("");
      setContent("");
      setType("regular");
      setImage(null);
      setImagePreview(null);
      setPublishDate(new Date());
    }
  }, [news]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      toast.error("Lütfen bir başlık girin.");
      return;
    }

    if (!content) {
      toast.error("Lütfen haber içeriği girin.");
      return;
    }

    const data = {
      title,
      content,
      type,
      status: "draft" as const,
      image: imagePreview || undefined,
    };

    setFormData(data);
    setShowConfirmation(true);
  };

  const handleConfirmedSave = () => {
    if (!formData) return;

    if (onSave) {
      onSave(formData);
    }

    // Reset form
    resetForm();
    setShowConfirmation(false);
    onOpenChange(false);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setType("regular");
    setImage(null);
    setImagePreview(null);
    setPublishDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            {news ? "Haber Düzenle" : "Haber Ekle"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-gray-700 dark:text-gray-300">
              Haber Tipi
            </Label>
            <RadioGroup
              defaultValue={type}
              value={type}
              onValueChange={(value: "regular" | "sportlink") => setType(value)}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" />
                <Label
                  htmlFor="regular"
                  className="font-normal text-gray-600 dark:text-gray-400"
                >
                  Normal Haber
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sportlink" id="sportlink" />
                <Label
                  htmlFor="sportlink"
                  className="font-normal text-gray-600 dark:text-gray-400"
                >
                  SportLink Etkinlik
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
              Başlık
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Haber başlığı girin"
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="content"
              className="text-gray-700 dark:text-gray-300"
            >
              İçerik
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Haber içeriği girin"
              rows={5}
              className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-gray-700 dark:text-gray-300">
              Kapak Görseli
            </Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-32 flex flex-col items-center justify-center border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => document.getElementById("image")?.click()}
              >
                <ImageIcon className="h-8 w-8 mb-2 text-gray-400 dark:text-gray-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Görsel seçmek için tıklayın
                </span>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </Button>

              {imagePreview && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={imagePreview}
                    alt="Önizleme"
                    className="w-full h-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-6 w-6"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="publishDate"
              className="text-gray-700 dark:text-gray-300"
            >
              Yayın Tarihi
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="publishDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-gray-200 dark:border-gray-700",
                    !publishDate && "text-gray-500 dark:text-gray-400"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {publishDate ? (
                    format(publishDate, "PPP", { locale: tr })
                  ) : (
                    <span>Tarih seçin</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <Calendar
                  mode="single"
                  selected={publishDate}
                  onSelect={setPublishDate}
                  initialFocus
                  locale={tr}
                  className="bg-white dark:bg-gray-800"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200 dark:border-gray-700"
            >
              İptal
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              {news ? "Güncelle" : "Kaydet"}
            </Button>
          </div>
        </form>
      </DialogContent>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {news ? "Haberi Güncelle" : "Haberi Kaydet"}
            </DialogTitle>
            <DialogDescription>
              {news
                ? "Bu haberi güncellemek istediğinizden emin misiniz?"
                : "Bu haberi kaydetmek istediğinizden emin misiniz?"}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowConfirmation(false)}
            >
              İptal
            </Button>
            <Button
              type="button"
              onClick={handleConfirmedSave}
              className="bg-primary hover:bg-primary/90"
            >
              {news ? "Güncelle" : "Kaydet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
}
