import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:grocery_app/models/category.dart';
import 'package:grocery_app/models/pagination.dart';
import 'package:grocery_app/providers/category_provider.dart';

class HomeCategoriesWidget extends ConsumerWidget {
  const HomeCategoriesWidget({super.key});

  @override
  // DÜZELTME 1: WidgetRef kullandık
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.all(8.0),
            child: Text(
              "All Categories",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: _categoriesList(ref),
          )
        ],
      ),
    );
  }

  Widget _categoriesList(WidgetRef ref) {
    final categories = ref.watch(
      categoriesProvider(
        PaginationModel(page: 1, pageSize: 10),
      ),
    );

    return categories.when(
      data: (list) {
        return _buildCategoryList(list!);
      },
      // Hata veya Yüklenme durumunda boş dönmemesi için basit widgetlar koyduk
      error: (_, __) => const Center(child: Text("Hata oluştu")),
      loading: () => const Center(child: CircularProgressIndicator()),
    ); // DÜZELTME 2: Buraya noktalı virgül eklendi
  }

  Widget _buildCategoryList(List<Category> categories) {
    return Container(
      height: 100,
      alignment: Alignment.centerLeft,
      child: ListView.builder(
        shrinkWrap: true,
        physics: const ClampingScrollPhysics(),
        scrollDirection: Axis.horizontal,
        itemCount: categories.length,
        itemBuilder: (context, index) {
          var data = categories[index];
          return GestureDetector(
            onTap: () {
              // Tıklama aksiyonu buraya
            },
            child: Padding(
              padding: const EdgeInsets.all(8),
              child: Column(
                children: [
                  Container(
                    margin: const EdgeInsets.all(8),
                    width: 50,
                    height: 50,
                    alignment: Alignment.center,
                    // Modeldeki getter sayesinde artık bu çalışır:
                    child: Image.network(
                      data.fullImagePath, 
                      height: 50,
                      fit: BoxFit.cover,
                      // Resim yüklenemezse hata vermesin diye koruma:
                      errorBuilder: (context, error, stackTrace) => 
                          const Icon(Icons.error, color: Colors.red),
                    ),
                  ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Text(
                        data.categoryName,
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const Icon(
                        Icons.keyboard_arrow_right,
                        size: 13,
                      )
                    ],
                  )
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}