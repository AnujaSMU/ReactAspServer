﻿// <auto-generated />
using System;
using MCDA_Project.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MCDA_Project.Server.Migrations
{
    [DbContext(typeof(RecipeFinderContext))]
    [Migration("20241207172605_AddIndexes2")]
    partial class AddIndexes2
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("MCDA_Project.Server.Models.Image", b =>
                {
                    b.Property<int>("ImageID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("ImageID"));

                    b.Property<string>("ImageURL")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("RecipeID")
                        .HasColumnType("int");

                    b.HasKey("ImageID");

                    b.HasIndex("RecipeID");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Ingredient", b =>
                {
                    b.Property<int>("IngredientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("IngredientID"));

                    b.Property<decimal>("CostPerUnit")
                        .HasColumnType("decimal(65,30)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("IngredientID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Ingredients");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Recipe", b =>
                {
                    b.Property<int>("RecipeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RecipeID"));

                    b.Property<int>("AuthorID")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Steps")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Views")
                        .HasColumnType("int");

                    b.HasKey("RecipeID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Recipes");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.RecipeIngredient", b =>
                {
                    b.Property<int>("RecipeIngredientID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("RecipeIngredientID"));

                    b.Property<int>("IngredientID")
                        .HasColumnType("int");

                    b.Property<decimal>("Quantity")
                        .HasColumnType("decimal(65,30)");

                    b.Property<int>("RecipeID")
                        .HasColumnType("int");

                    b.HasKey("RecipeIngredientID");

                    b.HasIndex("IngredientID")
                        .HasDatabaseName("IX_RecipeIngredients_IngredientID");

                    b.HasIndex("RecipeID")
                        .HasDatabaseName("IX_RecipeIngredients_RecipeID");

                    b.ToTable("RecipeIngredients");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("UserID"));

                    b.Property<string>("City")
                        .HasColumnType("longtext");

                    b.Property<string>("Country")
                        .HasColumnType("longtext");

                    b.Property<string>("CreditCardNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("CreditCardType")
                        .HasColumnType("longtext");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("longtext");

                    b.Property<DateTime?>("ExpiryDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<string>("PostalCode")
                        .HasColumnType("longtext");

                    b.Property<string>("ProvinceState")
                        .HasColumnType("longtext");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserID");

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Image", b =>
                {
                    b.HasOne("MCDA_Project.Server.Models.Recipe", "Recipe")
                        .WithMany("Images")
                        .HasForeignKey("RecipeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Recipe", b =>
                {
                    b.HasOne("MCDA_Project.Server.Models.User", "Author")
                        .WithMany("Recipes")
                        .HasForeignKey("AuthorID")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Author");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.RecipeIngredient", b =>
                {
                    b.HasOne("MCDA_Project.Server.Models.Ingredient", "Ingredient")
                        .WithMany("RecipeIngredients")
                        .HasForeignKey("IngredientID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MCDA_Project.Server.Models.Recipe", "Recipe")
                        .WithMany("RecipeIngredients")
                        .HasForeignKey("RecipeID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Ingredient");

                    b.Navigation("Recipe");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Ingredient", b =>
                {
                    b.Navigation("RecipeIngredients");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.Recipe", b =>
                {
                    b.Navigation("Images");

                    b.Navigation("RecipeIngredients");
                });

            modelBuilder.Entity("MCDA_Project.Server.Models.User", b =>
                {
                    b.Navigation("Recipes");
                });
#pragma warning restore 612, 618
        }
    }
}
