﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using SysQueiroz.Core;
using System;

namespace SysQueiroz.Core.Migrations
{
    [DbContext(typeof(SysQueirozContext))]
    partial class SysQueirozContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("SysQueiroz.Core.Entities.Authorization", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("MenuId");

                    b.Property<int?>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("MenuId");

                    b.HasIndex("UserId");

                    b.ToTable("Authorizations");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Client", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Account");

                    b.Property<string>("Agency");

                    b.Property<string>("Bank");

                    b.Property<string>("BenefitNumber");

                    b.Property<DateTime>("BirthDate");

                    b.Property<string>("CPF");

                    b.Property<string>("CounterCheckPassword");

                    b.Property<string>("Email");

                    b.Property<string>("Name");

                    b.Property<string>("Op");

                    b.Property<string>("Phone");

                    b.Property<string>("PortalPassword");

                    b.Property<string>("PortalRegistration");

                    b.Property<string>("RG");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.ToTable("Clients");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Department", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("DepartmentId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("DepartmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Menu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Href");

                    b.Property<string>("Icon");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Menus");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<int?>("EmployeeId");

                    b.Property<string>("Password");

                    b.HasKey("Id");

                    b.HasIndex("EmployeeId")
                        .IsUnique()
                        .HasFilter("[EmployeeId] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Authorization", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Menu", "Menu")
                        .WithMany("Authorizations")
                        .HasForeignKey("MenuId");

                    b.HasOne("SysQueiroz.Core.Entities.User", "User")
                        .WithMany("Authorizations")
                        .HasForeignKey("UserId");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.Employee", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId");
                });

            modelBuilder.Entity("SysQueiroz.Core.Entities.User", b =>
                {
                    b.HasOne("SysQueiroz.Core.Entities.Employee", "Employee")
                        .WithOne("User")
                        .HasForeignKey("SysQueiroz.Core.Entities.User", "EmployeeId");
                });
#pragma warning restore 612, 618
        }
    }
}
