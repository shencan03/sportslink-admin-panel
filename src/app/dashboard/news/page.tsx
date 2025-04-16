"use client";

import { useState, useRef, useCallback } from "react";
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
  ChevronRight,
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

interface NewsImage {
  url: string;
  alt: string;
  aspectRatio: "video" | "square" | "portrait";
}

interface NewsMetadata {
  author?: string;
  lastModified?: string;
  viewCount?: number;
  priority: "high" | "medium" | "low";
}

interface News {
  id: string;
  title: string;
  content: string;
  summary?: string;
  date: string;
  status: "published" | "draft";
  type: "regular" | "sportlink";
  image?: NewsImage;
  metadata: NewsMetadata;
}

interface NewsInput {
  title: string;
  content: string;
  summary?: string;
  status: "published" | "draft";
  type: "regular" | "sportlink";
  image?: NewsImage;
  metadata?: Partial<NewsMetadata>;
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
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const scrollElementToCenter = useCallback((element: HTMLElement) => {
    const viewportHeight = window.innerHeight;
    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const elementHeight = elementRect.height;
    const centerPosition =
      absoluteElementTop - (viewportHeight - elementHeight) / 2;

    window.scrollTo({
      top: Math.max(0, centerPosition),
      behavior: "smooth",
    });
  }, []);

  const handleAccordionChange = useCallback(
    (value: string) => {
      if (value) {
        const element = document.getElementById(value);
        if (element) {
          scrollElementToCenter(element);
        }
      }
    },
    [scrollElementToCenter]
  );

  const [news, setNews] = useState<News[]>([
    {
      id: "1",
      title: "Yeni Spor Salonu Açılıyor",
      content:
        "Yeni spor salonumuz 1 Nisan'da açılıyor. Modern ekipmanlar ve geniş antrenman alanlarıyla hizmetinizde olacak. Açılışa özel ilk ay ücretsiz deneme fırsatını kaçırmayın!",
      summary:
        "Modern ekipmanlar ve geniş antrenman alanlarıyla yeni spor salonumuz açılıyor.",
      date: "2024-03-10",
      status: "published",
      type: "regular",
      image: {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
        alt: "Yeni Spor Salonu",
        aspectRatio: "video",
      },
      metadata: {
        author: "Admin",
        lastModified: "2024-03-10",
        viewCount: 156,
        priority: "high",
      },
    },
    {
      id: "2",
      title: "Yaz Kampı Kayıtları Başladı",
      content:
        "Yaz kampı kayıtları için son başvuru tarihi yaklaşıyor. 7-14 yaş arası çocuklar için özel programlar, profesyonel eğitmenler eşliğinde spor ve eğlence dolu bir yaz fırsatı!",
      summary: "7-14 yaş arası çocuklar için yaz kampı kayıtları başladı.",
      date: "2024-03-15",
      status: "draft",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1472586662442-3eec04b9dbda?q=80&w=1200&auto=format&fit=crop",
        alt: "Yaz Kampı",
        aspectRatio: "video",
      },
      metadata: {
        author: "Spor Koordinatörü",
        lastModified: "2024-03-15",
        viewCount: 89,
        priority: "high",
      },
    },
    {
      id: "3",
      title: "Başarılı Sporcularımızı Tebrik Ediyoruz",
      content:
        "Geçen hafta sonu düzenlenen İstanbul Gençler Yüzme Şampiyonası'nda kulübümüz sporcuları 3 altın, 2 gümüş madalya kazandı. Tüm sporcularımızı ve antrenörlerimizi kutluyoruz!",
      summary: "İstanbul Gençler Yüzme Şampiyonası'nda 5 madalya kazandık.",
      date: "2024-03-20",
      status: "published",
      type: "regular",
      metadata: {
        author: "Yüzme Antrenörü",
        lastModified: "2024-03-20",
        viewCount: 245,
        priority: "medium",
      },
    },
    {
      id: "4",
      title: "Fitness Challenge Başlıyor",
      content:
        "1 Nisan - 1 Mayıs tarihleri arasında düzenlenecek Fitness Challenge'a katılın, hedeflerinize ulaşın! Aylık üyelik kazanma şansı ve profesyonel beslenme danışmanlığı ödülleri sizi bekliyor.",
      summary: "Bir aylık fitness challenge ile hedeflerinize ulaşın.",
      date: "2024-03-22",
      status: "published",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
        alt: "Fitness Challenge",
        aspectRatio: "video",
      },
      metadata: {
        author: "Fitness Koordinatörü",
        lastModified: "2024-03-22",
        viewCount: 178,
        priority: "high",
      },
    },
    {
      id: "5",
      title: "Yeni Grup Dersleri Programı",
      content:
        "Nisan ayı grup dersleri programımız yayınlandı. Yoga, Pilates, Zumba ve yeni eklenen HIIT sınıflarımıza kayıtlar başladı. Yerinizi hemen ayırtın!",
      summary: "Nisan ayı grup dersleri programı yayınlandı.",
      date: "2024-03-25",
      status: "published",
      type: "regular",
      metadata: {
        author: "Grup Dersleri Koordinatörü",
        lastModified: "2024-03-25",
        viewCount: 134,
        priority: "medium",
      },
    },
    {
      id: "6",
      title: "Beslenme Semineri",
      content:
        "Uzman diyetisyenimiz eşliğinde 'Sporcu Beslenmesi ve Performans' konulu seminerimiz 5 Nisan'da gerçekleşecek. Katılım ücretsizdir, rezervasyon gereklidir.",
      summary: "Sporcu beslenmesi ve performans semineri 5 Nisan'da.",
      date: "2024-03-27",
      status: "draft",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
        alt: "Beslenme Semineri",
        aspectRatio: "video",
      },
      metadata: {
        author: "Spor Diyetisyeni",
        lastModified: "2024-03-27",
        viewCount: 67,
        priority: "medium",
      },
    },
    {
      id: "7",
      title: "Yüzme Kursları Yeni Dönem",
      content:
        "Yaz dönemi yüzme kurslarımız için kayıtlar başladı. Çocuk, yetişkin ve özel ders seçenekleriyle her seviyeye uygun programlar sunuyoruz.",
      summary: "Yaz dönemi yüzme kursları kayıtları başladı.",
      date: "2024-03-28",
      status: "published",
      type: "regular",
      image: {
        url: "https://images.unsplash.com/photo-1560090995-01632a28895b?q=80&w=1200&auto=format&fit=crop",
        alt: "Yüzme Kursları",
        aspectRatio: "video",
      },
      metadata: {
        author: "Yüzme Koordinatörü",
        lastModified: "2024-03-28",
        viewCount: 198,
        priority: "high",
      },
    },
    {
      id: "8",
      title: "SportLink Turnuvası",
      content:
        "İlk SportLink Dostluk Turnuvası 15 Nisan'da başlıyor! Basketbol, voleybol ve futbol branşlarında kayıtlar devam ediyor. Takımınızı kurun, turnuvaya katılın!",
      summary:
        "Basketbol, voleybol ve futbol branşlarında SportLink Turnuvası başlıyor.",
      date: "2024-03-30",
      status: "published",
      type: "sportlink",
      image: {
        url: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?q=80&w=1200&auto=format&fit=crop",
        alt: "SportLink Turnuvası",
        aspectRatio: "video",
      },
      metadata: {
        author: "Turnuva Koordinatörü",
        lastModified: "2024-03-30",
        viewCount: 342,
        priority: "high",
      },
    },
    {
      id: "9",
      title: "Ramazan Ayı Özel Programı",
      content:
        "Ramazan ayına özel düzenlenen spor programlarımız ve iftardan sonra kullanılabilir esnek saat uygulaması hakkında detaylı bilgi için resepsiyona danışabilirsiniz.",
      summary: "Ramazan ayına özel spor programları ve esnek saatler.",
      date: "2024-04-01",
      status: "published",
      type: "regular",
      metadata: {
        author: "Tesis Müdürü",
        lastModified: "2024-04-01",
        viewCount: 167,
        priority: "medium",
      },
    },
    {
      id: "10",
      title: "Yeni Antrenörlerimiz",
      content:
        "Profesyonel kadromuza katılan yeni antrenörlerimiz ile tanışın! Crossfit, Boxing ve Functional Training alanlarında uzman eğitmenlerimiz hizmetinizde.",
      summary:
        "Crossfit, Boxing ve Functional Training uzmanları aramıza katıldı.",
      date: "2024-04-02",
      status: "draft",
      type: "regular",
      image: {
        url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
        alt: "Yeni Antrenörler",
        aspectRatio: "video",
      },
      metadata: {
        author: "İnsan Kaynakları",
        lastModified: "2024-04-02",
        viewCount: 89,
        priority: "high",
      },
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

  const handleEditNews = (id: string, updatedNews: Partial<NewsInput>) => {
    setNews(
      news.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedNews,
              metadata: {
                ...item.metadata,
                lastModified: new Date().toISOString(),
                ...(updatedNews.metadata || {}),
              },
            }
          : item
      )
    );
    toast.success("Haber başarıyla güncellendi");
    setEditingNews(null);
  };

  const handleDeleteNews = (id: string) => {
    setNews(news.filter((item) => item.id !== id));
    toast.success("Haber başarıyla silindi");
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

  const handleNewsClick = (newsItem: News) => {
    setSelectedNews(newsItem);
    setIsContentModalOpen(true);
  };

  const NewsCard = ({ news }: { news: News }) => (
    <div
      className={cn(
        "group border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden",
        news.type === "sportlink" &&
          "bg-blue-50/90 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800"
      )}
      onClick={() => handleNewsClick(news)}
    >
      <div className="flex items-start space-x-4 p-4">
        {news.image && (
          <div className="relative hidden sm:block flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <img
              src={news.image.url}
              alt={news.image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 text-base line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                {new Date(news.date).toLocaleDateString("tr-TR")}
              </span>
            </div>
            {news.summary && (
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {news.summary}
              </p>
            )}
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={news.status === "published" ? "default" : "secondary"}
                className={cn(
                  "px-1.5 py-0 text-xs",
                  news.status === "published"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-100 border border-green-200 dark:border-green-800"
                    : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                )}
              >
                {news.status === "published" ? "Yayında" : "Taslak"}
              </Badge>
              {news.type === "sportlink" && (
                <Badge
                  variant="secondary"
                  className="px-1.5 py-0 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                >
                  SportLink
                </Badge>
              )}
              {news.metadata.priority === "high" && (
                <Badge
                  variant="secondary"
                  className="px-1.5 py-0 text-xs bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"
                >
                  Önemli
                </Badge>
              )}
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
      </div>
    </div>
  );

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
        onSave={(newsData: NewsInput) => {
          if (editingNews) {
            // Update existing news
            setNews(
              news.map((item) =>
                item.id === editingNews.id
                  ? {
                      ...item,
                      ...newsData,
                      metadata: {
                        ...item.metadata,
                        lastModified: new Date().toISOString(),
                        ...(newsData.metadata || {}),
                      },
                    }
                  : item
              )
            );
            toast.success("Haber başarıyla güncellendi", {
              description: `"${newsData.title}" başlıklı haber güncellendi.`,
              icon: <CheckCircle2 className="h-4 w-4 text-green-500" />,
              duration: 4000,
            });
          } else {
            // Add new news
            const newNews: News = {
              id: String(Date.now()),
              ...newsData,
              date: new Date().toISOString(),
              metadata: {
                author: "Admin", // Default author
                lastModified: new Date().toISOString(),
                viewCount: 0,
                priority: "medium", // Default priority
                ...(newsData.metadata || {}),
              },
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-gray-900 dark:text-gray-100">
              Tüm Haberler
            </CardTitle>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredNews.length} haber
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {filteredNews.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isContentModalOpen} onOpenChange={setIsContentModalOpen}>
        <DialogContent className="sm:max-w-2xl">
          {selectedNews && (
            <>
              <DialogHeader>
                <div className="space-y-1">
                  <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {selectedNews.title}
                  </DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(selectedNews.date).toLocaleDateString("tr-TR")}
                    </span>
                    {selectedNews.metadata.author && (
                      <>
                        <span>•</span>
                        <span>{selectedNews.metadata.author}</span>
                      </>
                    )}
                    {selectedNews.metadata.viewCount && (
                      <>
                        <span>•</span>
                        <span>
                          {selectedNews.metadata.viewCount} görüntülenme
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4">
                {selectedNews.image && (
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={selectedNews.image.url}
                      alt={selectedNews.image.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  {selectedNews.content}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700"
                      >
                        <Smartphone className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Mobil Önizleme
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[320px] p-0">
                      <DialogHeader className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
                        <DialogTitle className="text-sm sm:text-base">
                          Mobil Önizleme
                        </DialogTitle>
                      </DialogHeader>
                      <div className="overflow-hidden">
                        {selectedNews.image && (
                          <div className="aspect-[4/3] w-full">
                            <img
                              src={selectedNews.image.url}
                              alt={selectedNews.image.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-3 sm:p-4 space-y-2">
                          <h3 className="font-semibold text-sm sm:text-base">
                            {selectedNews.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                            {selectedNews.content}
                          </p>
                          <div className="flex justify-between items-center text-xs pt-2 border-t border-gray-200 dark:border-gray-700">
                            <span className="text-gray-500 dark:text-gray-400">
                              {new Date(selectedNews.date).toLocaleDateString(
                                "tr-TR"
                              )}
                            </span>
                            {selectedNews.type === "sportlink" && (
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
                    className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700"
                    onClick={() => {
                      setEditingNews(selectedNews);
                      setIsNewsModalOpen(true);
                      setIsContentModalOpen(false);
                    }}
                  >
                    <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Düzenle
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs sm:text-sm border-gray-200 dark:border-gray-700"
                    onClick={() => {
                      setConfirmAction({
                        type: "status",
                        itemId: selectedNews.id,
                        newStatus:
                          selectedNews.status === "published"
                            ? "draft"
                            : "published",
                      });
                      setIsContentModalOpen(false);
                    }}
                  >
                    {selectedNews.status === "published"
                      ? "Taslağa Al"
                      : "Yayınla"}
                  </Button>

                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 text-xs sm:text-sm"
                    onClick={() => {
                      setConfirmAction({
                        type: "delete",
                        itemId: selectedNews.id,
                      });
                      setIsContentModalOpen(false);
                    }}
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Sil
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

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
