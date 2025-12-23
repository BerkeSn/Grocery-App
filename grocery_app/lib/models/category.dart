import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:grocery_app/config.dart';


part 'category.freezed.dart';
part 'category.g.dart';

// DÜZELTME 1: Sonuna .toList() ekledik. Yoksa hata verir.
List<Category> categoriesFromJson(dynamic str) => 
    List<dynamic>.from(str).map((x) => Category.fromJson(x)).toList();

@freezed
abstract class Category with _$Category {
  factory Category({
    required String categoryName,
    required String categoryImage,
    required String categoryId,
  }) = _Category;

  factory Category.fromJson(Map<String, dynamic> json) =>
      _$CategoryFromJson(json);
}

extension CategoryExt on Category{
  String get fullImagePath => Config.imageURL + categoryImage;
}