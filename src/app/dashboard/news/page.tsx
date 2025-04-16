"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  ChevronDown,
  Plus,
  Smartphone,
  Filter,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { NewsModal } from "@/components/modals/NewsModal";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  status: "published" | "draft";
  type: "regular" | "sportlink";
  image?: string;
}

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "regular" | "sportlink">(
    "all"
  );
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft"
  >("all");
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(
    undefined
  );
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [news, setNews] = useState<News[]>([
    {
      id: "1",
      title: "Yeni Spor Salonu Açılıyor",
      content:
        "Yeni spor salonumuz 1 Nisan'da açılıyor. Modern ekipmanlar ve geniş antrenman alanlarıyla hizmetinizde olacak. Açılışa özel ilk ay ücretsiz deneme fırsatını kaçırmayın!",
      date: "2024-03-10",
      status: "published",
      type: "regular",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "2",
      title: "Yaz Kampı Kayıtları Başladı",
      content:
        "Yaz kampı kayıtları için son başvuru tarihi yaklaşıyor. 7-14 yaş arası çocuklar için özel programlar, profesyonel eğitmenler eşliğinde spor ve eğlence dolu bir yaz fırsatı!",
      date: "2024-03-15",
      status: "draft",
      type: "sportlink",
      image:
        "https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "3",
      title: "Başarılı Sporcularımızı Tebrik Ediyoruz",
      content:
        "Geçen hafta sonu düzenlenen İstanbul Gençler Yüzme Şampiyonası'nda kulübümüz sporcuları 3 altın, 2 gümüş madalya kazandı. Tüm sporcularımızı ve antrenörlerimizi kutluyoruz!",
      date: "2024-03-20",
      status: "published",
      type: "regular",
    },
    {
      id: "4",
      title: "Fitness Challenge Başlıyor",
      content:
        "1 Nisan - 1 Mayıs tarihleri arasında düzenlenecek Fitness Challenge'a katılın, hedeflerinize ulaşın! Aylık üyelik kazanma şansı ve profesyonel beslenme danışmanlığı ödülleri sizi bekliyor.",
      date: "2024-03-22",
      status: "published",
      type: "sportlink",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "5",
      title: "Yeni Grup Dersleri Programı",
      content:
        "Nisan ayı grup dersleri programımız yayınlandı. Yoga, Pilates, Zumba ve yeni eklenen HIIT sınıflarımıza kayıtlar başladı. Yerinizi hemen ayırtın!",
      date: "2024-03-25",
      status: "published",
      type: "regular",
    },
    {
      id: "6",
      title: "Beslenme Semineri",
      content:
        "Uzman diyetisyenimiz eşliğinde 'Sporcu Beslenmesi ve Performans' konulu seminerimiz 5 Nisan'da gerçekleşecek. Katılım ücretsizdir, rezervasyon gereklidir.",
      date: "2024-03-27",
      status: "draft",
      type: "sportlink",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "7",
      title: "Yüzme Kursları Yeni Dönem",
      content:
        "Yaz dönemi yüzme kurslarımız için kayıtlar başladı. Çocuk, yetişkin ve özel ders seçenekleriyle her seviyeye uygun programlar sunuyoruz.",
      date: "2024-03-28",
      status: "published",
      type: "regular",
      image:
        "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "8",
      title: "SportLink Turnuvası",
      content:
        "İlk SportLink Dostluk Turnuvası 15 Nisan'da başlıyor! Basketbol, voleybol ve futbol branşlarında kayıtlar devam ediyor. Takımınızı kurun, turnuvaya katılın!",
      date: "2024-03-30",
      status: "published",
      type: "sportlink",
      image:
        "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "9",
      title: "Ramazan Ayı Özel Programı",
      content:
        "Ramazan ayına özel düzenlenen spor programlarımız ve iftardan sonra kullanılabilir esnek saat uygulaması hakkında detaylı bilgi için resepsiyona danışabilirsiniz.",
      date: "2024-04-01",
      status: "published",
      type: "regular",
    },
    {
      id: "10",
      title: "Yeni Antrenörlerimiz",
      content:
        "Profesyonel kadromuza katılan yeni antrenörlerimiz ile tanışın! Crossfit, Boxing ve Functional Training alanlarında uzman eğitmenlerimiz hizmetinizde.",
      date: "2024-04-02",
      status: "draft",
      type: "regular",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    },
  ]);

  const [confirmAction, setConfirmAction] = useState<{
    type: "delete" | "status" | null;
    itemId: string | null;
    newStatus?: "published" | "draft";
  }>({ type: null, itemId: null });

  const targetNews = confirmAction.itemId
    ? news.find((item) => item.id === confirmAction.itemId)
    : null;

  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEditNews = (id: string, updatedNews: Partial<News>) => {
    setNews(
      news.map((item) => (item.id === id ? { ...item, ...updatedNews } : item))
    );
    toast.success("Haber başarıyla güncellendi");
    setEditingNews(null);
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi");
  };

  const handleAccordionChange = (value: string) => {
    setOpenAccordion(value);
    if (value) {
      setTimeout(() => {
        const element = accordionRefs.current[value];
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          const header = document.querySelector("header");
          const headerOffset = header ? header.offsetHeight : 80;
          window.scrollBy(0, -headerOffset - 20); // Additional offset for spacing
        }
      }, 150); // Increased delay to ensure accordion is expanded
    }
  };

  const handleConfirmedDelete = (id: string) => {
    const newsToDelete = news.find((item) => item.id === id);
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi", {
      description: `"${newsToDelete?.title}" başlıklı haber silindi.`,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
    setConfirmAction({ type: null, itemId: null });
  };

  const handleConfirmedStatusChange = (
    id: string,
    newStatus: "published" | "draft"
  ) => {
    const targetNews = news.find((item) => item.id === id);
    setNews(
      news.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    toast.success("Haber durumu güncellendi", {
      description: `"${targetNews?.title}" başlıklı haber ${
        newStatus === "published" ? "yayınlandı" : "taslağa alındı"
      }.`,
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
    });
    setConfirmAction({ type: null, itemId: null });
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Haber & Duyuru Yönetimi
        </h2>

        <div className="flex w-full max-w-3xl items-center justify-between space-x-4">
          <div className="flex items-center space-x-2 flex-1">
            <Input
              placeholder="Haber ara..."
              className="flex-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              value={typeFilter}
              onValueChange={(value: "all" | "regular" | "sportlink") =>
                setTypeFilter(value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Haber Tipi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="regular">Normal Haberler</SelectItem>
                <SelectItem value="sportlink">
                  SportLink Etkinlikleri
                </SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value: "all" | "published" | "draft") =>
                setStatusFilter(value)
              }
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="published">Yayında</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => setIsNewsModalOpen(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Haber Ekle
          </Button>
        </div>
      </div>

      <NewsModal
        open={isNewsModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsNewsModalOpen(open);
            setEditingNews(null);
          } else {
            setIsNewsModalOpen(open);
          }
        }}
        news={editingNews}
        onSave={(newsData) => {
          if (editingNews) {
            // Update existing news
            setNews(
              news.map((item) =>
                item.id === editingNews.id ? { ...item, ...newsData } : item
              )
            );
            toast.success("Haber başarıyla güncellendi", {
              description: `"${newsData.title}" başlıklı haber güncellendi.`,
              icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
              duration: 4000,
            });
          } else {
            // Add new news
            const newNews = {
              id: String(Date.now()),
              ...newsData,
              date: new Date().toISOString(),
            };
            setNews([...news, newNews]);
            toast.success("Yeni haber eklendi", {
              description: `"${newsData.title}" başlıklı haber oluşturuldu.`,
              icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
              duration: 4000,
            });
          }
          setIsNewsModalOpen(false);
          setEditingNews(null);
        }}
      />

      <Card className="mx-auto max-w-3xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80">
          <CardTitle className="text-gray-900 dark:text-gray-100">
            Tüm Haberler
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-3"
            value={openAccordion}
            onValueChange={handleAccordionChange}
          >
            {filteredNews.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className={cn(
                  "border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all",
                  item.type === "sportlink" &&
                    "bg-blue-50/90 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
                )}
                ref={(el: HTMLDivElement | null) => {
                  accordionRefs.current[item.id] = el;
                }}
              >
                <AccordionTrigger className="hover:no-underline w-full p-0 [&[data-state=open]>div>svg]:rotate-180 cursor-pointer">
                  <div className="flex items-start space-x-4 p-3 sm:p-4 w-full">
                    {item.image && (
                      <div className="relative hidden sm:block flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-1 flex-col space-y-1">
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <span className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base line-clamp-2">
                            {item.title}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                            {new Date(item.date).toLocaleDateString("tr-TR")}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          <Badge
                            variant={
                              item.status === "published"
                                ? "default"
                                : "secondary"
                            }
                            className={cn(
                              "px-1.5 py-0 text-xs",
                              item.status === "published"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-100 border border-green-200 dark:border-green-800"
                                : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                            )}
                          >
                            {item.status === "published" ? "Yayında" : "Taslak"}
                          </Badge>
                          {item.type === "sportlink" && (
                            <Badge
                              variant="secondary"
                              className="px-1.5 py-0 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                            >
                              SportLink
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-3 sm:space-y-4">
                    {item.image && (
                      <div className="relative aspect-video sm:aspect-[2/1] w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      {item.content}
                    </p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700 cursor-pointer"
                          >
                            <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            Mobil Önizleme
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[320px] p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <DialogHeader className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                            <DialogTitle className="text-sm sm:text-base text-gray-900 dark:text-gray-100">
                              Mobil Önizleme
                            </DialogTitle>
                          </DialogHeader>
                          <div className="overflow-hidden">
                            {item.image && (
                              <div className="aspect-[4/3] w-full">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="p-3 sm:p-4 space-y-2">
                              <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
                                {item.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                                {item.content}
                              </p>
                              <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                                <span className="text-gray-500 dark:text-gray-400">
                                  {new Date(item.date).toLocaleDateString(
                                    "tr-TR"
                                  )}
                                </span>
                                {item.type === "sportlink" && (
                                  <Badge
                                    variant="secondary"
                                    className="px-1.5 py-0 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  >
                                    SportLink
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700 cursor-pointer"
                        onClick={() => {
                          setEditingNews(item);
                          setIsNewsModalOpen(true);
                        }}
                      >
                        <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Düzenle
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700 cursor-pointer"
                        onClick={() =>
                          setConfirmAction({
                            type: "status",
                            itemId: item.id,
                            newStatus:
                              item.status === "published"
                                ? "draft"
                                : "published",
                          })
                        }
                      >
                        {item.status === "published" ? "Taslağa Al" : "Yayınla"}
                      </Button>

                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-8 text-xs sm:text-sm cursor-pointer"
                        onClick={() =>
                          setConfirmAction({ type: "delete", itemId: item.id })
                        }
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
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

      <ConfirmationDialog
        open={confirmAction.type === "delete"}
        onOpenChange={(open) =>
          !open && setConfirmAction({ type: null, itemId: null })
        }
        title="Haberi Sil"
        description={`"${targetNews?.title}" başlıklı haberi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        actionLabel="Sil"
        variant="destructive"
        onConfirm={() =>
          confirmAction.itemId && handleConfirmedDelete(confirmAction.itemId)
        }
      />

      <ConfirmationDialog
        open={confirmAction.type === "status"}
        onOpenChange={(open) =>
          !open && setConfirmAction({ type: null, itemId: null })
        }
        title="Haber Durumunu Güncelle"
        description={
          confirmAction.newStatus === "published"
            ? `"${targetNews?.title}" başlıklı haberi yayınlamak istediğinizden emin misiniz?`
            : `"${targetNews?.title}" başlıklı haberi taslağa almak istediğinizden emin misiniz?`
        }
        actionLabel={
          confirmAction.newStatus === "published" ? "Yayınla" : "Taslağa Al"
        }
        variant={
          confirmAction.newStatus === "published" ? "default" : "warning"
        }
        onConfirm={() =>
          confirmAction.itemId &&
          confirmAction.newStatus &&
          handleConfirmedStatusChange(
            confirmAction.itemId,
            confirmAction.newStatus
          )
        }
      />
    </div>
  );
}
